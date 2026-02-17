"use client";

import { useState, useMemo, useEffect } from "react";
import posthog from "posthog-js";
import { motion, AnimatePresence } from "framer-motion";
import {
  TREASURE_TROVE_POEMS,
  TREASURE_TROVE_STORIES,
  TreasureTroveItem,
} from "@/lib/treasure-trove-data";

type TabType = "poems" | "stories";
type DetailTab = "overview" | "explanation" | "quiz" | "comprehension" | "literary";

export default function TreasureTrovePage() {
  const [activeTab, setActiveTab] = useState<TabType>("poems");
  const [selectedItem, setSelectedItem] = useState<TreasureTroveItem | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  
  // Comprehension state
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [showPassageAnswers, setShowPassageAnswers] = useState<boolean[]>([]);
  
  // Explanation flashcard state
  const [currentExplanationIndex, setCurrentExplanationIndex] = useState(0);

  useEffect(() => {
    posthog.capture("treasure_trove_page_viewed");
  }, []);

  const filteredItems = useMemo(() => {
    const items = activeTab === "poems" ? TREASURE_TROVE_POEMS : TREASURE_TROVE_STORIES;
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.author?.toLowerCase().includes(query) ||
        item.themes.some((t) => t.toLowerCase().includes(query))
    );
  }, [activeTab, searchQuery]);

  const openDetail = (item: TreasureTroveItem) => {
    setSelectedItem(item);
    setDetailTab("overview");
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setQuizScore({ correct: 0, total: 0 });
    setCurrentPassageIndex(0);
    setShowPassageAnswers([]);
    setCurrentExplanationIndex(0);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    if (showAnswer) return;
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    const isCorrect = answerIndex === selectedItem?.mcqs?.[currentQuizIndex]?.correctAnswer;
    setQuizScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const nextQuestion = () => {
    if (selectedItem?.mcqs && currentQuizIndex < selectedItem.mcqs.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setQuizScore({ correct: 0, total: 0 });
  };

  const togglePassageAnswer = (index: number) => {
    setShowPassageAnswers((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>
          Treasure Trove
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          ICSE English Literature — Poems & Short Stories with MCQs, Explanations & Comprehension
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          className="p-4 rounded-xl"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="text-2xl font-bold" style={{ color: "#7b61ff" }}>
            {TREASURE_TROVE_POEMS.length}
          </div>
          <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
            Poems
          </div>
        </div>
        <div
          className="p-4 rounded-xl"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="text-2xl font-bold" style={{ color: "#1a73e8" }}>
            {TREASURE_TROVE_STORIES.length}
          </div>
          <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
            Short Stories
          </div>
        </div>
        <div
          className="p-4 rounded-xl"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="text-2xl font-bold" style={{ color: "#34a853" }}>
            {TREASURE_TROVE_POEMS.reduce((acc, p) => acc + (p.mcqs?.length || 0), 0) +
              TREASURE_TROVE_STORIES.reduce((acc, s) => acc + (s.mcqs?.length || 0), 0)}
          </div>
          <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
            MCQ Questions
          </div>
        </div>
        <div
          className="p-4 rounded-xl"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="text-2xl font-bold" style={{ color: "#f59e0b" }}>
            {TREASURE_TROVE_POEMS.reduce((acc, p) => acc + (p.comprehensionPassages?.length || 0), 0) +
              TREASURE_TROVE_STORIES.reduce((acc, s) => acc + (s.comprehensionPassages?.length || 0), 0)}
          </div>
          <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
            Comprehension Passages
          </div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("poems")}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer"
            style={{
              background: activeTab === "poems" ? "var(--primary)" : "var(--bg-card)",
              color: activeTab === "poems" ? "#fff" : "var(--text-secondary)",
              border: `1px solid ${activeTab === "poems" ? "transparent" : "var(--border)"}`,
            }}
          >
            📜 Poems ({TREASURE_TROVE_POEMS.length})
          </button>
          <button
            onClick={() => setActiveTab("stories")}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer"
            style={{
              background: activeTab === "stories" ? "var(--primary)" : "var(--bg-card)",
              color: activeTab === "stories" ? "#fff" : "var(--text-secondary)",
              border: `1px solid ${activeTab === "stories" ? "transparent" : "var(--border)"}`,
            }}
          >
            📖 Stories ({TREASURE_TROVE_STORIES.length})
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by title, author, or theme..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 rounded-lg text-sm w-full sm:w-64"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
        />
      </div>

      {/* Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            onClick={() => openDetail(item)}
            className="p-4 rounded-xl cursor-pointer transition-all hover:scale-[1.02] group"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-semibold" style={{ color: "var(--text)" }}>
                  {item.title}
                </h3>
                {item.author && (
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    by {item.author}
                  </p>
                )}
                <p
                  className="text-sm mt-2 line-clamp-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.themes.slice(0, 3).map((theme) => (
                    <span
                      key={theme}
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{
                        background: "rgba(123, 97, 255, 0.1)",
                        color: "#7b61ff",
                      }}
                    >
                      {theme}
                    </span>
                  ))}
                </div>
                {/* Feature badges */}
                <div className="flex gap-2 mt-3">
                  {item.mcqs && item.mcqs.length > 0 && (
                    <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: "rgba(52, 168, 83, 0.1)", color: "#34a853" }}>
                      {item.mcqs.length} MCQs
                    </span>
                  )}
                  {item.lineExplanations && item.lineExplanations.length > 0 && (
                    <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: "rgba(26, 115, 232, 0.1)", color: "#1a73e8" }}>
                      Line-by-Line
                    </span>
                  )}
                  {item.comprehensionPassages && item.comprehensionPassages.length > 0 && (
                    <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" }}>
                      {item.comprehensionPassages.length} Passages
                    </span>
                  )}
                </div>
              </div>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                style={{ background: item.type === "poem" ? "rgba(123,97,255,0.1)" : "rgba(26,115,232,0.1)" }}
              >
                <span className="text-xl">{item.type === "poem" ? "📜" : "📖"}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12" style={{ color: "var(--text-secondary)" }}>
          No {activeTab} found matching your search.
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-4xl max-h-[90vh] overflow-hidden z-50 rounded-2xl flex flex-col"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Modal Header */}
              <div className="p-4 border-b flex items-start justify-between shrink-0" style={{ borderColor: "var(--border)" }}>
                <div>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: selectedItem.type === "poem" ? "rgba(123,97,255,0.1)" : "rgba(26,115,232,0.1)",
                      color: selectedItem.type === "poem" ? "#7b61ff" : "#1a73e8",
                    }}
                  >
                    {selectedItem.type === "poem" ? "📜 Poem" : "📖 Short Story"}
                  </span>
                  <h2 className="text-xl font-bold mt-2" style={{ color: "var(--text)" }}>
                    {selectedItem.title}
                  </h2>
                  {selectedItem.author && (
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      by {selectedItem.author}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-lg transition-colors hover:bg-white/10"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Detail Tabs */}
              <div className="flex gap-1 px-4 pt-3 overflow-x-auto shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
                {[
                  { id: "overview", label: "Overview", icon: "📋" },
                  ...(selectedItem.lineExplanations?.length ? [{ id: "explanation", label: "Line Explanation", icon: "📝" }] : []),
                  ...(selectedItem.mcqs?.length ? [{ id: "quiz", label: "MCQ Quiz", icon: "❓" }] : []),
                  ...(selectedItem.comprehensionPassages?.length ? [{ id: "comprehension", label: "Comprehension", icon: "📖" }] : []),
                  ...(selectedItem.literaryDevices?.length ? [{ id: "literary", label: "Literary Devices", icon: "✨" }] : []),
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setDetailTab(tab.id as DetailTab)}
                    className="px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap"
                    style={{
                      color: detailTab === tab.id ? "var(--primary)" : "var(--text-secondary)",
                      borderBottom: detailTab === tab.id ? "2px solid var(--primary)" : "2px solid transparent",
                      marginBottom: "-1px",
                    }}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* Overview Tab */}
                {detailTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>
                        Summary
                      </h3>
                      <p className="text-sm whitespace-pre-line" style={{ color: "var(--text-secondary)" }}>
                        {selectedItem.detailedSummary || selectedItem.summary}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>
                        Themes
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.themes.map((theme) => (
                          <span
                            key={theme}
                            className="px-3 py-1.5 rounded-full text-sm"
                            style={{
                              background: "rgba(123, 97, 255, 0.1)",
                              color: "#7b61ff",
                            }}
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>
                        Key Points
                      </h3>
                      <ul className="space-y-2">
                        {selectedItem.keyPoints.map((point, i) => (
                          <li
                            key={i}
                            className="text-sm flex gap-2 p-2 rounded-lg"
                            style={{ background: "var(--bg-secondary)", color: "var(--text-secondary)" }}
                          >
                            <span style={{ color: "#34a853" }}>✓</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedItem.characters && selectedItem.characters.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>
                          Characters
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selectedItem.characters.map((char) => (
                            <div
                              key={char.name}
                              className="p-3 rounded-lg"
                              style={{ background: "var(--bg-secondary)" }}
                            >
                              <div className="font-medium text-sm" style={{ color: "var(--text)" }}>
                                👤 {char.name}
                              </div>
                              <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                                {char.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedItem.importantQuotes && selectedItem.importantQuotes.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>
                          Important Quotes
                        </h3>
                        <div className="space-y-2">
                          {selectedItem.importantQuotes.map((quote, i) => (
                            <blockquote
                              key={i}
                              className="text-sm italic p-3 rounded-lg border-l-3"
                              style={{
                                color: "var(--text-secondary)",
                                borderLeftColor: "#7b61ff",
                                borderLeftWidth: "3px",
                                background: "var(--bg-secondary)",
                              }}
                            >
                              "{quote}"
                            </blockquote>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Line Explanation Tab */}
                {detailTab === "explanation" && selectedItem.lineExplanations && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {currentExplanationIndex + 1} of {selectedItem.lineExplanations.length} sections
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCurrentExplanationIndex((prev) => Math.max(0, prev - 1))}
                          disabled={currentExplanationIndex === 0}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                          style={{ background: "var(--bg-secondary)", color: "var(--text)" }}
                        >
                          ← Previous
                        </button>
                        <button
                          onClick={() => setCurrentExplanationIndex((prev) => Math.min(selectedItem.lineExplanations!.length - 1, prev + 1))}
                          disabled={currentExplanationIndex === selectedItem.lineExplanations.length - 1}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                          style={{ background: "var(--primary)", color: "#fff" }}
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                    
                    <motion.div
                      key={currentExplanationIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 rounded-xl"
                      style={{ background: "var(--bg-secondary)" }}
                    >
                      <div className="font-semibold text-sm mb-2" style={{ color: "#7b61ff" }}>
                        {selectedItem.lineExplanations[currentExplanationIndex].lines}
                      </div>
                      <div
                        className="text-sm italic mb-4 p-3 rounded-lg border-l-3"
                        style={{
                          color: "var(--text)",
                          borderLeftColor: "#7b61ff",
                          borderLeftWidth: "3px",
                          background: "var(--bg-card)",
                        }}
                      >
                        "{selectedItem.lineExplanations[currentExplanationIndex].text}"
                      </div>
                      <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {selectedItem.lineExplanations[currentExplanationIndex].explanation}
                      </div>
                    </motion.div>

                    {/* Progress dots */}
                    <div className="flex justify-center gap-1.5 pt-4">
                      {selectedItem.lineExplanations.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentExplanationIndex(i)}
                          className="w-2 h-2 rounded-full transition-all"
                          style={{
                            background: i === currentExplanationIndex ? "var(--primary)" : "var(--border)",
                            transform: i === currentExplanationIndex ? "scale(1.3)" : "scale(1)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Quiz Tab */}
                {detailTab === "quiz" && selectedItem.mcqs && (
                  <div className="space-y-4">
                    {/* Quiz Progress */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                        Question {currentQuizIndex + 1} of {selectedItem.mcqs.length}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm" style={{ color: "#34a853" }}>
                          ✓ {quizScore.correct}
                        </span>
                        <span className="text-sm" style={{ color: "#ea4335" }}>
                          ✗ {quizScore.total - quizScore.correct}
                        </span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${((currentQuizIndex + 1) / selectedItem.mcqs.length) * 100}%`,
                          background: "var(--primary)",
                        }}
                      />
                    </div>

                    {/* Question */}
                    <motion.div
                      key={currentQuizIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl"
                      style={{ background: "var(--bg-secondary)" }}
                    >
                      <p className="font-medium mb-4" style={{ color: "var(--text)" }}>
                        {selectedItem.mcqs[currentQuizIndex].question}
                      </p>

                      <div className="space-y-2">
                        {selectedItem.mcqs[currentQuizIndex].options.map((option, i) => {
                          const isCorrect = i === selectedItem.mcqs![currentQuizIndex].correctAnswer;
                          const isSelected = i === selectedAnswer;
                          let bgColor = "var(--bg-card)";
                          let borderColor = "var(--border)";
                          
                          if (showAnswer) {
                            if (isCorrect) {
                              bgColor = "rgba(52, 168, 83, 0.15)";
                              borderColor = "#34a853";
                            } else if (isSelected && !isCorrect) {
                              bgColor = "rgba(234, 67, 53, 0.15)";
                              borderColor = "#ea4335";
                            }
                          } else if (isSelected) {
                            bgColor = "rgba(123, 97, 255, 0.15)";
                            borderColor = "#7b61ff";
                          }

                          return (
                            <button
                              key={i}
                              onClick={() => handleQuizAnswer(i)}
                              disabled={showAnswer}
                              className="w-full text-left p-3 rounded-lg text-sm transition-all flex items-center gap-3"
                              style={{
                                background: bgColor,
                                border: `1px solid ${borderColor}`,
                                color: "var(--text)",
                                cursor: showAnswer ? "default" : "pointer",
                              }}
                            >
                              <span
                                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
                                style={{ background: "var(--bg-secondary)", color: "var(--text-secondary)" }}
                              >
                                {String.fromCharCode(65 + i)}
                              </span>
                              {option}
                              {showAnswer && isCorrect && <span className="ml-auto">✓</span>}
                              {showAnswer && isSelected && !isCorrect && <span className="ml-auto">✗</span>}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      {showAnswer && selectedItem.mcqs[currentQuizIndex].explanation && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 p-3 rounded-lg text-sm"
                          style={{ background: "rgba(26, 115, 232, 0.1)", color: "#1a73e8" }}
                        >
                          💡 {selectedItem.mcqs[currentQuizIndex].explanation}
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Navigation */}
                    <div className="flex justify-between pt-2">
                      <button
                        onClick={resetQuiz}
                        className="px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ background: "var(--bg-secondary)", color: "var(--text-secondary)" }}
                      >
                        Reset Quiz
                      </button>
                      {showAnswer && currentQuizIndex < selectedItem.mcqs.length - 1 && (
                        <button
                          onClick={nextQuestion}
                          className="px-4 py-2 rounded-lg text-sm font-medium"
                          style={{ background: "var(--primary)", color: "#fff" }}
                        >
                          Next Question →
                        </button>
                      )}
                      {showAnswer && currentQuizIndex === selectedItem.mcqs.length - 1 && (
                        <div className="text-right">
                          <div className="text-lg font-bold" style={{ color: "var(--text)" }}>
                            Final Score: {quizScore.correct}/{quizScore.total}
                          </div>
                          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                            {Math.round((quizScore.correct / quizScore.total) * 100)}% accuracy
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Comprehension Tab */}
                {detailTab === "comprehension" && selectedItem.comprehensionPassages && (
                  <div className="space-y-4">
                    {/* Passage selector */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {selectedItem.comprehensionPassages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setCurrentPassageIndex(i);
                            setShowPassageAnswers([]);
                          }}
                          className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all"
                          style={{
                            background: currentPassageIndex === i ? "var(--primary)" : "var(--bg-secondary)",
                            color: currentPassageIndex === i ? "#fff" : "var(--text-secondary)",
                          }}
                        >
                          Passage {i + 1}
                        </button>
                      ))}
                    </div>

                    <motion.div
                      key={currentPassageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      {/* Extract */}
                      <div
                        className="p-4 rounded-xl border-l-4"
                        style={{
                          background: "var(--bg-secondary)",
                          borderLeftColor: "#7b61ff",
                        }}
                      >
                        <div className="text-xs font-medium mb-2" style={{ color: "#7b61ff" }}>
                          EXTRACT
                        </div>
                        <p
                          className="text-sm italic whitespace-pre-line"
                          style={{ color: "var(--text)" }}
                        >
                          {selectedItem.comprehensionPassages[currentPassageIndex].extract}
                        </p>
                      </div>

                      {/* Questions */}
                      <div className="space-y-3">
                        {selectedItem.comprehensionPassages[currentPassageIndex].questions.map((q, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl"
                            style={{ background: "var(--bg-secondary)" }}
                          >
                            <div className="flex items-start gap-3">
                              <span
                                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                                style={{ background: "var(--primary)", color: "#fff" }}
                              >
                                {i + 1}
                              </span>
                              <div className="flex-1">
                                <p className="font-medium text-sm mb-2" style={{ color: "var(--text)" }}>
                                  {q.question}
                                </p>
                                <button
                                  onClick={() => togglePassageAnswer(i)}
                                  className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                                  style={{
                                    background: showPassageAnswers[i] ? "rgba(52, 168, 83, 0.1)" : "rgba(123, 97, 255, 0.1)",
                                    color: showPassageAnswers[i] ? "#34a853" : "#7b61ff",
                                  }}
                                >
                                  {showPassageAnswers[i] ? "Hide Answer ↑" : "Show Answer ↓"}
                                </button>
                                <AnimatePresence>
                                  {showPassageAnswers[i] && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="mt-3 p-3 rounded-lg text-sm"
                                      style={{ background: "rgba(52, 168, 83, 0.1)", color: "var(--text-secondary)" }}
                                    >
                                      <span style={{ color: "#34a853", fontWeight: 600 }}>Answer: </span>
                                      {q.answer}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Literary Devices Tab */}
                {detailTab === "literary" && selectedItem.literaryDevices && (
                  <div className="space-y-3">
                    {selectedItem.literaryDevices.map((device, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl"
                        style={{ background: "var(--bg-secondary)" }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">✨</span>
                          <span className="font-semibold" style={{ color: "#7b61ff" }}>
                            {device.device}
                          </span>
                        </div>
                        <div
                          className="text-sm italic mb-2 p-2 rounded"
                          style={{ background: "var(--bg-card)", color: "var(--text)" }}
                        >
                          "{device.example}"
                        </div>
                        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                          {device.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
