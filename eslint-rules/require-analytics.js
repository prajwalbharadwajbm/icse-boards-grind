/**
 * ESLint rule: warn if a default-exported Page component doesn't import
 * `capture` from `@/lib/analytics`.
 */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Page components should import capture from @/lib/analytics",
    },
    schema: [],
    messages: {
      missingAnalytics:
        'Page components should import "capture" from "@/lib/analytics" to track page views.',
    },
  },
  create(context) {
    let hasAnalyticsImport = false;
    let defaultExportNode = null;

    return {
      ImportDeclaration(node) {
        if (
          node.source.value === "@/lib/analytics" &&
          node.specifiers.some(
            (s) => s.type === "ImportSpecifier" && s.imported.name === "capture"
          )
        ) {
          hasAnalyticsImport = true;
        }
      },
      ExportDefaultDeclaration(node) {
        defaultExportNode = node;
      },
      "Program:exit"() {
        if (defaultExportNode && !hasAnalyticsImport) {
          context.report({
            node: defaultExportNode,
            messageId: "missingAnalytics",
          });
        }
      },
    };
  },
};
