# Analyze Page Reorganization Guide

## Order of Sections (Your Request)

1. ✅ Search Bar & Results
2. ✅ Final Recommendation Card
3. ✅ Expert Cards (4 cards)
4. ✅ Charts (Price Action + Expert Scorecard)
5. ✅ **Emotion Awareness Check** ← MOVE HERE
6. ✅ **Confidence History** ← MOVE HERE  
7. ✅ **Action Plan** ← MOVE HERE
8. ✅ **What Could Change This Recommendation** ← MOVE HERE
9. ✅ **Collaborative AI Discussion** ← MOVE HERE
10. ✅ **Floating Chat Button** ← NEW (bottom-right, always visible)

## Floating Chatbot Implementation

### Requirements
- Round emoji button (🤖) in bottom-right corner
- Fixed position, always visible
- Opens modal/panel when clicked
- Contains the full chat interface
- Close button (X) to dismiss

### Code for Floating Chat Button

Add before closing `</AppShell>` tag:

```tsx
{/* Floating Chat Button */}
<AnimatePresence>
  {!isChatOpen && state === "done" && (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      onClick={() => setIsChatOpen(true)}
      className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-gradient-brand text-4xl shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
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
        className="fixed bottom-6 right-6 z-50 w-full max-w-md"
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
```

## State Required

Add to component state:
```tsx
const [isChatOpen, setIsChatOpen] = useState(false);
```

## Import Additions

Add these icons:
```tsx
import { MessageCircle, X } from "lucide-react";
```

## Section Ordering in Code

Move sections in this exact order after the charts:

1. Emotion Awareness Check (existing)
2. Confidence History (new)
3. Action Plan (new)
4. What Could Change This Recommendation (new)
5. Collaborative AI Discussion (enhanced)
6. Legend (existing - at bottom)
7. Floating Chat Button (new - fixed position)

## Complete File Structure

```
<AppShell>
  <Search Section>
  
  <AnimatePresence>
    {loading && <Loading State>}
    
    {done && (
      <>
        <Final Recommendation>
        <Expert Cards Grid>
        <Charts Grid>
        
        {/* CORRECTED ORDER STARTS HERE */}
        <Emotion Awareness Check>
        <Confidence History>
        <Action Plan>
        <What Could Change This>
        <Collaborative AI Discussion>
        <Legend>
      </>
    )}
  </AnimatePresence>
  
  {/* FLOATING ELEMENTS */}
  <Floating Chat Button>
  <Chat Modal>
</AppShell>
```

## Visual Design

### Floating Button
- Size: 64px × 64px (h-16 w-16)
- Position: Fixed bottom-right (bottom-6 right-6)
- Background: Gradient brand
- Emoji: 🤖 (text-4xl)
- Shadow: shadow-lg
- Hover: scale-110
- z-index: 50

### Chat Modal
- Width: Full width, max 448px (max-w-md)
- Position: Fixed bottom-right
- Height: Max 600px
- Background: surface-card
- Padding: p-5
- Shadow: shadow-2xl
- Border-radius: rounded-2xl
- z-index: 50

### Backdrop
- Position: Fixed inset-0
- Background: black/50 with backdrop-blur-sm
- z-index: 40
- Closes modal on click

## Animations

### Button Appear/Disappear
```tsx
initial={{ scale: 0 }}
animate={{ scale: 1 }}
exit={{ scale: 0 }}
```

### Modal Open
```tsx
initial={{ opacity: 0, scale: 0.9, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
exit={{ opacity: 0, scale: 0.9, y: 20 }}
```

### Backdrop
```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
```

## Mobile Responsiveness

Chat modal adjusts automatically:
- Mobile: Full width minus margins
- Desktop: Max 448px width
- Always bottom-right positioned
- Scrollable content area

## Z-Index Layers

- 10: Base content
- 40: Backdrop
- 50: Chat button & modal

This ensures proper stacking order.

## Testing Checklist

- [ ] Button appears after analysis completes
- [ ] Button has scale animation on mount
- [ ] Clicking button opens modal
- [ ] Clicking backdrop closes modal
- [ ] Clicking X button closes modal
- [ ] Suggested questions work
- [ ] Custom questions work
- [ ] Typing indicator animates
- [ ] Messages display correctly
- [ ] Scroll works in chat area
- [ ] Input disabled while typing
- [ ] Send button disabled when empty
- [ ] Mobile layout works
- [ ] Button hidden during loading state
- [ ] Modal animates smoothly

## Implementation Notes

1. The floating button only shows when `state === "done"`
2. Opening chat hides the button
3. Closing chat shows the button again
4. Chat state persists during session
5. Closing modal doesn't clear messages
6. Button uses emoji (🤖) not icon for personality
7. All existing features remain functional
8. Design matches premium theme

This creates a professional, polished AI chat experience!
