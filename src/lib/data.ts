import { supabase } from './supabase';

export type JobStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_access' | 'rain_delay';

export interface Booking {
  id: string;
  booking_number: string;
  customer_name: string;
  service_name: string;
  scheduled_date: string;
  scheduled_time_start: string;
  status: JobStatus;
  service_address_line1: string;
  phone: string;
  staff_name?: string;
  staff_id?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  total_bookings: number;
  total_spent: number;
}

// Helper to determine if we should use mock data
const useMock = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project-id');

const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    booking_number: 'GLG-2024-0001',
    customer_name: 'John Doe',
    service_name: 'Lawn Mowing',
    scheduled_date: '2024-05-06',
    scheduled_time_start: '09:00',
    status: 'confirmed',
    service_address_line1: '1234 Elm Street',
    phone: '+27821234567',
  },
  {
    id: '2',
    booking_number: 'GLG-2024-0002',
    customer_name: 'Jane Smith',
    service_name: 'Hedge Trimming',
    scheduled_date: '2024-05-06',
    scheduled_time_start: '11:30',
    status: 'in_progress',
    service_address_line1: '5573-Cok Avenue',
    phone: '+27829876543',
  },
  {
    id: '3',
    booking_number: 'GLG-2024-0003',
    customer_name: 'Michael Johnson',
    service_name: 'Garden Cleanup',
    scheduled_date: '2024-05-06',
    scheduled_time_start: '14:00',
    status: 'pending',
    service_address_line1: '9101 Maple Road',
    phone: '+27834567890',
  },
  {
    id: '4',
    booking_number: 'GLG-2024-0004',
    customer_name: 'Sarah Williams',
    service_name: 'Lawn Mowing',
    scheduled_date: '2024-05-06',
    scheduled_time_start: '16:30',
    status: 'pending',
    service_address_line1: '1123 Pine Lane',
    phone: '+27845671234',
  },
];

const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+27821234567', total_bookings: 5, total_spent: 1250 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+27829876543', total_bookings: 3, total_spent: 1350 },
];

const MOCK_STAFF: Staff[] = [
  { id: '1', name: 'Thabo Mokoena', role: 'Team Lead' },
  { id: '2', name: 'Pieter Viljoen', role: 'Gardener' },
];

export async function getStaff(): Promise<Staff[]> {
  if (useMock) {
    return MOCK_STAFF;
  }

  const { data, error } = await supabase
    .from('organization_members')
    .select(`
      id,
      users (full_name),
      role
    `)
    .eq('role', 'staff');

  if (error) throw error;
  
  return (data as any[]).map(m => ({
    id: m.id,
    name: m.users.full_name,
    role: m.role
  }));
}

export async function assignStaff(jobId: string, staffId: string) {
  if (useMock) {
    console.log(`Mock: Assigned staff ${staffId} to job ${jobId}`);
    return;
  }

  const { error } = await supabase
    .from('bookings')
    .update({ staff_id: staffId })
    .eq('id', jobId);

  if (error) throw error;
}

export async function getTodaysJobs(): Promise<Booking[]> {
  if (useMock) {
    return MOCK_BOOKINGS;
  }
  
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      id,
      booking_number,
      status,
      scheduled_date,
      scheduled_time_start,
      service_address_line1,
      customers (name, phone),
      booking_services (service_name)
    `)
    .eq('scheduled_date', today);

  if (error) throw error;
  
  return (data as any[]).map(b => ({
    id: b.id,
    booking_number: b.booking_number,
    status: b.status,
    scheduled_date: b.scheduled_date,
    scheduled_time_start: b.scheduled_time_start,
    service_address_line1: b.service_address_line1,
    customer_name: b.customers.name,
    phone: b.customers.phone,
    service_name: b.booking_services?.[0]?.service_name || 'N/A'
  }));
}

export async function updateJobStatus(jobId: string, status: JobStatus) {
  if (useMock) {
    console.log(`Mock: Updated job ${jobId} status to ${status}`);
    return;
  }

  const { error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', jobId);

  if (error) throw error;
}

export async function getCustomers(): Promise<Customer[]> {
  if (useMock) {
    return MOCK_CUSTOMERS;
  }

  const { data, error } = await supabase
    .from('customers')
    .select(`
      id,
      name,
      email,
      phone,
      total_bookings,
      total_spent
    `);

  if (error) throw error;
  return data as Customer[];
}

export async function getJobsForCustomer(customerId: string): Promise<Booking[]> {
  if (useMock) {
    return MOCK_BOOKINGS.filter(b => b.id === '1'); // Just mock something
  }

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      id,
      booking_number,
      status,
      scheduled_date,
      scheduled_time_start,
      service_address_line1,
      customers (name, phone),
      booking_services (service_name)
    `)
    .eq('customer_id', customerId);

  if (error) throw error;

  return (data as any[]).map(b => ({
    id: b.id,
    booking_number: b.booking_number,
    status: b.status,
    scheduled_date: b.scheduled_date,
    scheduled_time_start: b.scheduled_time_start,
    service_address_line1: b.service_address_line1,
    customer_name: b.customers.name,
    phone: b.customers.phone,
    service_name: b.booking_services?.[0]?.service_name || 'N/A'
  }));
}

export interface DashboardStats {
  upcoming_jobs: number;
  total_customers: number;
  monthly_revenue: number;
  pending_payments: number;
}

export async function getStats(): Promise<DashboardStats> {
  if (useMock) {
    return {
      upcoming_jobs: 8,
      total_customers: 42,
      monthly_revenue: 18400,
      pending_payments: 4200
    };
  }

  // Real Supabase stats logic would go here
  return {
    upcoming_jobs: 0,
    total_customers: 0,
    monthly_revenue: 0,
    pending_payments: 0
  };
}

export interface Organization {
  id: string;
  name: string;
  subscription_tier: 'starter' | 'professional' | 'enterprise';
  whatsapp_enabled: boolean;
  status: 'active' | 'suspended' | 'trial';
  subscription_expires_at?: string;
}

const MOCK_ORG: Organization = {
  id: 'org-1',
  name: 'GreenLawn Gardeners',
  subscription_tier: 'starter',
  whatsapp_enabled: false,
  status: 'trial',
  subscription_expires_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
};

export async function getOrganization(): Promise<Organization> {
  if (useMock) {
    return MOCK_ORG;
  }
  
  const { data, error } = await supabase
    .from('organizations')
    .select('id, name, subscription_tier, status, subscription_expires_at')
    .single();

  if (error) throw error;
  
  return {
    ...data,
    whatsapp_enabled: data.subscription_tier !== 'starter'
  } as Organization;
}

export interface SubscriptionInfo {
  isValid: boolean;
  tier: 'starter' | 'professional' | 'enterprise' | null;
  tierName: string | null;
  status: string | null;
  daysRemaining: number | null;
  isTrial: boolean;
  trialEnd: string | null;
  features: string[];
  errorMessage: string | null;
}

export async function checkSubscription(orgId: string): Promise<SubscriptionInfo> {
  if (useMock) {
    const org = await getOrganization();
    const features = org.subscription_tier === 'starter' 
      ? ['basic_booking', 'email_notifications']
      : ['whatsapp', 'analytics', 'recurring_bookings', 'custom_branding', 'staff_view'];
    
    if (org.subscription_tier === 'enterprise') {
      features.push('route_optimization', 'ai_receptionist', 'priority_support', 'api_access');
    }

    const expiresAt = org.subscription_expires_at ? new Date(org.subscription_expires_at) : null;
    const now = new Date();
    const daysRemaining = expiresAt ? Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : null;

    return {
      isValid: org.status !== 'suspended',
      tier: org.subscription_tier,
      tierName: org.subscription_tier.charAt(0).toUpperCase() + org.subscription_tier.slice(1),
      status: org.status === 'trial' ? 'trialing' : 'active',
      daysRemaining,
      isTrial: org.status === 'trial',
      trialEnd: org.subscription_expires_at || null,
      features,
      errorMessage: null
    };
  }

  const { data, error } = await supabase.functions.invoke('check-subscription', {
    body: { orgId }
  });

  if (error) throw error;
  return data as SubscriptionInfo;
}

export interface PortalAccessResult {
  accessEnabled: boolean;
  disabledReason: 'trial_expired' | 'subscription_expired' | 'suspended' | null;
  upgradeUrl: string | null;
  branding?: any;
}

export function isFeatureEnabled(info: SubscriptionInfo | null, feature: string): boolean {
  if (!info) return false;
  return info.features.includes(feature);
}

export async function checkPortalAccess(slug: string): Promise<PortalAccessResult> {
  if (useMock) {
    // Mock check based on slug
    if (slug === 'expired-lawn') {
      return {
        accessEnabled: false,
        disabledReason: 'subscription_expired',
        upgradeUrl: '/dashboard/settings/billing',
        branding: { name: 'Expired Lawn Services' }
      };
    }
    return {
      accessEnabled: true,
      disabledReason: null,
      upgradeUrl: null
    };
  }

  const { data, error } = await supabase.functions.invoke('check-portal-access', {
    body: { slug }
  });

  if (error) throw error;
  return data as PortalAccessResult;
}

export async function getStaffJobs(staffId: string): Promise<Booking[]> {
  if (useMock) {
    return MOCK_BOOKINGS.filter(b => b.id === '1' || b.id === '2'); // Mocking some jobs for a staff member
  }

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      id,
      booking_number,
      status,
      scheduled_date,
      scheduled_time_start,
      service_address_line1,
      customers (name, phone),
      booking_services (service_name)
    `)
    .eq('staff_id', staffId);

  if (error) throw error;

  return (data as any[]).map(b => ({
    id: b.id,
    booking_number: b.booking_number,
    status: b.status,
    scheduled_date: b.scheduled_date,
    scheduled_time_start: b.scheduled_time_start,
    service_address_line1: b.service_address_line1,
    customer_name: b.customers.name,
    phone: b.customers.phone,
    service_name: b.booking_services?.[0]?.service_name || 'N/A'
  }));
}
