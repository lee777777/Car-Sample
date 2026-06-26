import { queryOptions } from '@tanstack/react-query';
import API from './API'; 

/**
 * Global Admin Query Options 
 */
export const adminQueries = {
  // Fetch all partner applications
  applications: () => 
    queryOptions({
      queryKey: ['admin', 'applications'],
      queryFn: async () => {
        
        const response = await API.get('admin/partners_applications/')
        return response.data; 
      },
      staleTime: 1000 * 60 * 5, // 5 minutes cache admin/partners_applications
    }),

  // Fetch all registered artners
  partners: () => 
    queryOptions({
      queryKey: ['admin', 'partners'],
      queryFn: async () => {
        const response = await API.get('/admin/partners/');
        return response.data;
      },
      staleTime: 1000 * 60 * 5,
    }),

  // Fetch all client nquiries 
  inquiries: () => 
    queryOptions({
      queryKey: ['admin', 'inquiries'],
      queryFn: async () => {
        const response = await API.get('/admin/inquiries/');
        return response.data;
      },
      staleTime: 1000 * 60 * 2, // 2 minutes refresh window
    }),
    
  // Fetch specific partner ID 
  partnerDetails: (id) =>
    queryOptions({
      queryKey: ['admin', 'partners', id],
      queryFn: async () => {
        const response = await API.get(`/admin/partners/${id}/profile`);
        return response.data;
      },
      enabled: !!id,
    }),

  // Fetch specific application ID 
  applicationDetails: (id) =>
    queryOptions({
      queryKey: ['admin', 'applications', id],
      queryFn: async () => {
        const response = await API.get(`/admin/partners_applications/${id}/review`)
        return response.data;
      },
      enabled: !!id,
    }),

  // Fetch specific inquiry ID 
  inquiryDetails: (id) =>
    queryOptions({
      queryKey: ['admin', 'inquiries', id],
      queryFn: async () => {
        const response = await API.get(`/admin/inquiries/${id}`);
        return response.data;
      },
      enabled: !!id,
    })
};