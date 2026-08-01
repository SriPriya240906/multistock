// Add this to your analyze.tsx file

// 1. ADD TO IMPORTS (after existing imports)
import { MessageCircle, X } from "lucide-react";

// 2. ADD TO STATE (in Analyze component, after existing useState declarations)
const [isChatOpen, setIsChatOpen] = useState(false);

// 3. REPLACE SECTION ORDER (move sections to this exact order after charts)

{/* Emotion awareness */}
<section className="surface-card rounded-2xl p-5">
  {/* ... existing emotion awareness code ... */}
</section>

{/* Confidence History */}
<section className="surface-card rounded-2xl p-5">
  {/* ... existing confidence history code ... */}
</section>

{/* Action Plan Card */}
<section className="surface-card rounded-2xl p-5">
  {/* ... existing action plan code ... */}
</section>

{/* Recommendation Change Scenarios */}
<section className="surface-card rounded-2xl p-5">
  {/* ... existing scenarios code ... */}
</section>

{/* Collaborative AI Discussion */}
<section className="surface-card rounded-2xl p-5">
  {/* ... existing discussion code ... */}
</section>

{/* Legend */}
<div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
  <span className="flex items-center gap-1.5"><Activity className="h-3.5 w-3.5 text-primary" /> Technical</span>
  <span className="flex items-center gap-1.5"><BarChart3 className="h-3.5 w-3.5 text-info" /> Fundamental</span>
  <span className="flex items-center gap-1.5"><Smile className="h-3.5 w-3.5 text-warning" /> Sentiment</span>
  <span className="flex items-center gap-1.5"><ShieldAlert className="h-3.5 w-3.5 text-destructive" /> Risk</span>
</div>

// 4. REMOVE THE OLD INLINE CHAT SECTION  
// Delete the "AI Investment Committee Chat" section that's currently inline in the page

// 5. ADD FLOATING CHAT BUTTON & MODAL (before closing </AppShell> tag)

{/* Floating Chat Button */}
<AnimatePresence>
  {!isChatOpen && state === "done" && (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      whileHover={{ scale: 1.1 }}
      onClick={() => setIsChatOpen(true)}
      className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-gradient-brand text-4xl shadow-lg transition-transform flex items-center justify-center"
      aria-label="Open AI Chat"
    >
      🤖
    </motion.button>
  )}
</AnimatePresence>

{/* Chat Modal */}
<AnimatePresence>
  {isChatOpen && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsChatOpen(false)}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />
      
      {/* Chat Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-full sm:max-w-md"
      >
        <div className="surface-card rounded-2xl p-5 shadow-2xl max-h-[600px] flex flex-col">
          {/* Header */}
          <header className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="bg-gradient-brand grid h-10 w-10 shrink-0 place-items-center rounded-xl text-primary-foreground">
                <BrainCircuit className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-semibold">AI Investment Committee</h2>
                <p className="text-xs text-muted-foreground">Ask follow-up questions</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsChatOpen(false)}
              className="h-8 w-8 shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </header>

          {/* Chat Messages */}
          {chatMessages.length > 0 && (
            <div className="mb-4 flex-1 space-y-3 overflow-y-auto rounded-xl border border-border bg-secondary/30 p-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse text-right" : ""}`}
                >
                  <Avatar className="h-8 w-8 shrink-0 border border-border">
                    <AvatarFallback className="bg-secondary text-xs">
                      {msg.role === "user" ? "👤" : "🤖"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`min-w-0 max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-primary/10 border border-primary/20 text-foreground"
                        : "bg-secondary border border-border text-muted-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 shrink-0 border border-border">
                    <AvatarFallback className="bg-secondary text-xs">🤖</AvatarFallback>
                  </Avatar>
                  <div className="rounded-xl border border-border bg-secondary px-3.5 py-2.5">
                    <div className="flex gap-1">
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        className="h-2 w-2 rounded-full bg-muted-foreground"
                      />
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        className="h-2 w-2 rounded-full bg-muted-foreground"
                      />
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        className="h-2 w-2 rounded-full bg-muted-foreground"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Suggested Questions */}
          {chatMessages.length === 0 && (
            <div className="mb-4 flex-1 overflow-y-auto">
              <p className="mb-3 text-xs font-medium text-muted-foreground">Suggested questions:</p>
              <div className="space-y-2">
                {suggestedQuestions.slice(0, 4).map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleSuggestedQuestion(q.text)}
                    className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-left text-xs transition-colors hover:border-primary hover:bg-secondary"
                  >
                    {q.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(chatInput);
            }}
            className="flex gap-2"
          >
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about the recommendation..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button type="submit" size="icon" disabled={!chatInput.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
