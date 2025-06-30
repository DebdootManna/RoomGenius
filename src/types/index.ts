export interface RoomImage {
  id: string;
  file: File | null;
  preview: string | null;
  wall: 'wall-1' | 'wall-2' | 'wall-3' | 'wall-4';
}

export interface PersonalPreferences {
  fullName: string;
  personalityType: string;
  favoriteColors: string[];
  budgetRange: number;
  roomType: string;
}

export interface DesignPlan {
  wallColors: {
    color: string;
    name: string;
    hex: string;
  }[];
  furniture: {
    id: string;
    name: string;
    type: string;
    cost: number;
    description: string;
  }[];
  layoutRecommendation: string;
  totalCost: number;
  costBreakdown: {
    furniture: number;
    paint: number;
    accessories: number;
  };
}

export type WizardStep = 'upload' | 'preferences' | 'review' | 'results';