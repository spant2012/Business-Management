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
import { Switch } from "@/components/ui/switch"
import { Settings2 } from "lucide-react"
import { useSettingsConfig } from "@/lib/settings-config"

export function SettingsCustomizer() {
  const settings = useSettingsConfig()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Business Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input
              value={settings.companyName}
              onChange={(e) => settings.updateSettings({ companyName: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Currency Symbol</Label>
            <Input
              value={settings.currencySymbol}
              onChange={(e) => settings.updateSettings({ currencySymbol: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Date Format</Label>
            <Input
              value={settings.dateFormat}
              onChange={(e) => settings.updateSettings({ dateFormat: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Timezone</Label>
            <Input
              value={settings.timezone}
              onChange={(e) => settings.updateSettings({ timezone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base">Dashboard Widgets</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Show Inventory</Label>
                <Switch
                  checked={settings.dashboard.showInventory}
                  onCheckedChange={(checked) => 
                    settings.updateSettings({ 
                      dashboard: { ...settings.dashboard, showInventory: checked } 
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Show Tasks</Label>
                <Switch
                  checked={settings.dashboard.showTasks}
                  onCheckedChange={(checked) => 
                    settings.updateSettings({ 
                      dashboard: { ...settings.dashboard, showTasks: checked } 
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Show Attendance</Label>
                <Switch
                  checked={settings.dashboard.showAttendance}
                  onCheckedChange={(checked) => 
                    settings.updateSettings({ 
                      dashboard: { ...settings.dashboard, showAttendance: checked } 
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Show Revenue</Label>
                <Switch
                  checked={settings.dashboard.showRevenue}
                  onCheckedChange={(checked) => 
                    settings.updateSettings({ 
                      dashboard: { ...settings.dashboard, showRevenue: checked } 
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
