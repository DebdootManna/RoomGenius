import { PersonalPreferences, RoomImage, DesignPlan } from '../types';

export interface GeneratePlanRequest {
  images: RoomImage[];
  preferences: PersonalPreferences;
}

export async function generateDesignPlan(data: GeneratePlanRequest): Promise<DesignPlan> {
  try {
    // Mock API response for demonstration
    // In production, this would be a real API call
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate API delay

    // Mock response based on user preferences
    const mockPlan: DesignPlan = {
      wallColors: [
        { color: 'Soft Sage', name: 'Benjamin Moore Healing Aloe', hex: '#A8C090' },
        { color: 'Warm White', name: 'Sherwin Williams Pure White', hex: '#F7F3E9' },
        { color: 'Accent Wall', name: 'Deep Forest Green', hex: '#2D5016' },
      ],
      furniture: [
        {
          id: '1',
          name: 'Modern Sectional Sofa',
          type: 'Seating',
          cost: 1200,
          description: 'Comfortable L-shaped sectional in neutral fabric',
        },
        {
          id: '2',
          name: 'Coffee Table',
          type: 'Table',
          cost: 350,
          description: 'Glass-top coffee table with wooden legs',
        },
        {
          id: '3',
          name: 'Floor Lamp',
          type: 'Lighting',
          cost: 180,
          description: 'Arc floor lamp with adjustable brightness',
        },
        {
          id: '4',
          name: 'Area Rug',
          type: 'Decor',
          cost: 280,
          description: '8x10 geometric pattern rug in complementary colors',
        },
        {
          id: '5',
          name: 'Wall Art Set',
          type: 'Decor',
          cost: 150,
          description: 'Set of 3 framed botanical prints',
        },
      ],
      layoutRecommendation: `Based on your ${data.preferences.personalityType.toLowerCase()} personality and ${data.preferences.roomType.toLowerCase()} space, we recommend placing the sectional sofa facing the main focal point (TV or fireplace) with the coffee table centered in front. The floor lamp should be positioned near a reading corner, and the area rug should extend at least 6 inches beyond the front legs of your seating. This layout promotes both comfort and conversation while maintaining the ${data.preferences.personalityType.toLowerCase()} aesthetic you prefer.`,
      totalCost: 2160,
      costBreakdown: {
        furniture: 1830,
        paint: 180,
        accessories: 150,
      },
    };

    return mockPlan;
  } catch (error) {
    console.error('Failed to generate design plan:', error);
    throw new Error('Failed to generate design plan. Please try again.');
  }
}