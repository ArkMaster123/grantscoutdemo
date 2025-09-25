import React from "react";
import { format, parseISO } from "date-fns";
import { Building, Calendar, DollarSign, ExternalLink, Info, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useGrantStore } from "@/hooks/useGrantStore";
import type { Grant } from "@shared/types";
const DetailRow: React.FC<{ icon: React.ElementType; label: string; value: React.ReactNode }> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start">
    <Icon className="mr-4 mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
    <div>
      <p className="font-semibold text-foreground">{label}</p>
      <p className="text-muted-foreground">{value}</p>
    </div>
  </div>
);
export const GrantDetail: React.FC = () => {
  const selectedGrant = useGrantStore((s) => s.selectedGrant);
  const setSelectedGrant = useGrantStore((s) => s.setSelectedGrant);
  const isOpen = !!selectedGrant;
  if (!selectedGrant) {
    return null;
  }
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(selectedGrant.amount);
  const formattedDeadline = format(parseISO(selectedGrant.deadline), "EEEE, MMMM d, yyyy");
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && setSelectedGrant(null)}>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="secondary" className="mb-2 font-medium">{selectedGrant.category}</Badge>
              <DialogTitle className="text-2xl font-bold text-foreground">{selectedGrant.title}</DialogTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSelectedGrant(null)} className="shrink-0">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto px-6 pb-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <DetailRow icon={Building} label="Funder" value={selectedGrant.funder} />
              <DetailRow icon={DollarSign} label="Funding Amount" value={formattedAmount} />
              <DetailRow icon={Calendar} label="Application Deadline" value={formattedDeadline} />
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center">
                <Info className="mr-3 h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">Description</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{selectedGrant.description}</p>
            </div>
          </div>
        </div>
        <div className="bg-muted/50 p-6">
          <a href={selectedGrant.url} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
              Apply Now
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};