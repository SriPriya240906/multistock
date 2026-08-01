import { createFileRoute } from "@tanstack/react-router";
import { Copy, KeyRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — StockSphere AI" },
      {
        name: "description",
        content:
          "Manage your profile, notification rules, theme, language and market data API keys for StockSphere AI.",
      },
      { property: "og:title", content: "Settings — StockSphere AI" },
      {
        property: "og:description",
        content: "Profile, notifications, appearance, language and API key management.",
      },
    ],
  }),
  component: Settings,
});

function Settings() {
  const { theme, toggle } = useTheme();
  const [lang, setLang] = useState("en");

  return (
    <AppShell title="Settings" subtitle="Control your profile, alerts, appearance and data sources.">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="flex-wrap">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Theme & Language</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-5">
          <section className="surface-card max-w-2xl rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border border-border">
                <AvatarFallback className="bg-gradient-brand font-semibold text-primary-foreground">AR</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Ananya Rao</p>
                <p className="text-xs text-muted-foreground">Pro plan · joined Mar 2026</p>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" defaultValue="Ananya Rao" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="ananya@vellorecapital.com" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="risk">Risk appetite</Label>
                <Select defaultValue="moderate">
                  <SelectTrigger id="risk"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="bg-gradient-brand mt-6 text-primary-foreground hover:opacity-90" onClick={() => toast.success("Profile saved")}>
              Save changes
            </Button>
          </section>
        </TabsContent>

        <TabsContent value="notifications" className="mt-5">
          <section className="surface-card max-w-2xl divide-y divide-border rounded-2xl p-6">
            {[
              ["Recommendation changes", "Alert me when an expert panel flips a verdict."],
              ["High conflict alerts", "Notify me when conflict level reaches High."],
              ["Emotion awareness nudges", "Warn me about FOMO and overtrading patterns."],
              ["Weekly digest", "A Monday summary of my portfolio and watchlist."],
            ].map(([title, desc], i) => (
              <div key={title} className="flex items-start justify-between gap-6 py-4 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <Switch defaultChecked={i !== 3} className="shrink-0" />
              </div>
            ))}
          </section>
        </TabsContent>

        <TabsContent value="appearance" className="mt-5">
          <section className="surface-card max-w-2xl rounded-2xl p-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-medium">Dark mode</p>
                <p className="text-xs text-muted-foreground">Currently using the {theme} theme.</p>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={toggle} className="shrink-0" />
            </div>
            <Separator className="my-6" />
            <div className="max-w-xs space-y-2">
              <Label htmlFor="lang">Language</Label>
              <Select value={lang} onValueChange={setLang}>
                <SelectTrigger id="lang"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिन्दी</SelectItem>
                  <SelectItem value="ta">தமிழ்</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="api" className="mt-5">
          <section className="surface-card max-w-2xl rounded-2xl p-6">
            <header className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                <KeyRound className="h-[18px] w-[18px]" />
              </span>
              <div>
                <p className="text-sm font-semibold">Market data keys</p>
                <p className="text-xs text-muted-foreground">Used for price, fundamentals and news providers.</p>
              </div>
            </header>
            <div className="mt-6 space-y-4">
              {[
                ["Price data provider", "sk_live_price_••••••••4f2a"],
                ["Fundamentals provider", "sk_live_fund_••••••••91cd"],
                ["News & sentiment feed", "sk_live_news_••••••••7b60"],
              ].map(([label, value]) => (
                <div key={label} className="space-y-2">
                  <Label>{label}</Label>
                  <div className="flex gap-2">
                    <Input readOnly value={value} className="font-mono text-xs" />
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label={`Copy ${label}`}
                      onClick={() => toast.success("Key copied to clipboard")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Keys are masked in the interface. Rotate them from your provider console if exposed.
            </p>
          </section>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
