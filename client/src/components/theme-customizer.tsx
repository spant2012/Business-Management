import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Settings } from "lucide-react"
import { useThemeConfig } from "@/lib/theme-config"

export function ThemeCustomizer() {
  const { primary, radius, variant, appearance, updateTheme } = useThemeConfig()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Customize Theme</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Primary Color</Label>
            <Input
              type="color"
              value={primary}
              onChange={(e) => updateTheme({ primary: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Border Radius</Label>
            <Slider
              value={[radius]}
              min={0}
              max={1}
              step={0.1}
              onValueChange={([value]) => updateTheme({ radius: value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Theme Variant</Label>
            <Select value={variant} onValueChange={(value: any) => updateTheme({ variant: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="tint">Tint</SelectItem>
                <SelectItem value="vibrant">Vibrant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Appearance</Label>
            <Select value={appearance} onValueChange={(value: any) => updateTheme({ appearance: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
