export type BrandingConfig = {
  name: string;
  brand_primary_color: string;
  brand_secondary_color: string;
  brand_accent_color: string;
  font_family: string;
  logo_url?: string;
  radius?: string; // This is a UI-only field for now
};

export const defaultBranding: BrandingConfig = {
  name: "RootOS",
  brand_primary_color: "#2D5A27",
  brand_secondary_color: "#4A7C44",
  brand_accent_color: "#D97706",
  font_family: "Inter, sans-serif",
  logo_url: "/rootos-logo.png",
  radius: "0.75rem",
};

// Mock database for organizations aligned with architect schema
const mockOrgs: Record<string, BrandingConfig> = {
  "rootos": defaultBranding,
  "greenlawn": {
    name: "GreenLawn Garden Services",
    brand_primary_color: "#1b5e20",
    brand_secondary_color: "#388e3c",
    brand_accent_color: "#8bc34a",
    font_family: "Inter, sans-serif",
    logo_url: "/rootos-logo.png",
    radius: "1rem",
  },
  "sunny-lawns": {
    name: "Sunny Lawns",
    brand_primary_color: "#fbc02d",
    brand_secondary_color: "#fdd835",
    brand_accent_color: "#fb8c00",
    font_family: "Inter, sans-serif",
    logo_url: "/rootos-logo.png",
    radius: "0.5rem",
  },
};

export async function getBranding(slug: string): Promise<BrandingConfig> {
  // In a real app, this would fetch from Supabase
  // const { data, error } = await supabase.from('organizations').select('*').eq('slug', slug).single();
  // return data;
  
  return mockOrgs[slug] || defaultBranding;
}
