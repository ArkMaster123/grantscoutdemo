import React from "react";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { Bookmark, Building, Calendar, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGrantStore } from "@/hooks/useGrantStore";
import { cn } from "@/lib/utils";
import type { Grant } from "@shared/types";
import { toast } from "sonner";
interface GrantCardProps {
  grant: Grant;
}
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
export const GrantCard: React.FC<GrantCardProps> = React.memo(({ grant }) => {
  const savedGrantIds = useGrantStore((s) => s.savedGrantIds);
  const toggleSavedGrant = useGrantStore((s) => s.toggleSavedGrant);
  const setSelectedGrant = useGrantStore((s) => s.setSelectedGrant);
  const isSaved = savedGrantIds.has(grant.id);
  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when saving
    toggleSavedGrant(grant.id);
    toast.success(isSaved ? "Grant unsaved!" : "Grant saved!", {
      description: grant.title,
    });
  };
  const handleCardClick = () => {
    setSelectedGrant(grant);
  };
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(grant.amount);
  const formattedDeadline = format(parseISO(grant.deadline), "MMMM d, yyyy");
  return (
    <motion.div variants={cardVariants} className="h-full">
      <Card 
        className="flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border-border/60 bg-card transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1"
        onClick={handleCardClick}
      >
        <CardHeader>
          <div className="mb-2 flex items-start justify-between">
            <Badge variant="secondary" className="font-medium">{grant.category}</Badge>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8 shrink-0", isSaved && "text-blue-500")}
              onClick={handleSaveToggle}
              aria-label={isSaved ? "Unsave grant" : "Save grant"}
            >
              <Bookmark className={cn("h-5 w-5", isSaved && "fill-current")} />
            </Button>
          </div>
          <CardTitle className="text-xl font-bold leading-tight text-foreground">
            {grant.title}
          </CardTitle>
          <CardDescription className="flex items-center pt-1 text-sm text-muted-foreground">
            <Building className="mr-2 h-4 w-4" />
            {grant.funder}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-4 text-sm text-muted-foreground">
          <p className="line-clamp-3">{grant.description}</p>
          <div className="space-y-2">
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">{formattedAmount}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-primary" />
              <span>Deadline: {formattedDeadline}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/40 p-4">
          <Button className="w-full bg-blue-600 text-white hover:bg-blue-700" onClick={handleCardClick}>
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
});