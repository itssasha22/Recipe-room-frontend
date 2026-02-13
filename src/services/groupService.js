import api from './api';
import { API_ENDPOINTS } from '../config/api.config';

export const groupService = {
  getAllGroups: async () => {
    const response = await api.get(API_ENDPOINTS.GROUPS);
    return response.data;
  },

  getUserGroups: async () => {
    const response = await api.get('/groups/my-groups');
    return response.data;
  },

  getGroupById: async (groupId) => {
    const response = await api.get(API_ENDPOINTS.GROUP_BY_ID(groupId));
    return response.data;
  },

  createGroup: async (groupData) => {
    const response = await api.post(API_ENDPOINTS.GROUPS, groupData);
    return response.data;
  },

  uploadGroupImage: async (groupId, formData) => {
    const response = await api.post(`/groups/${groupId}/upload-image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  joinGroup: async (groupId) => {
    const response = await api.post(`/groups/${groupId}/join`);
    return response.data;
  },

  getGroupMembers: async (groupId) => {
    const response = await api.get(API_ENDPOINTS.GROUP_MEMBERS(groupId));
    return response.data;
  },

  getGroupRecipes: async (groupId) => {
    const response = await api.get(API_ENDPOINTS.GROUP_RECIPES(groupId));
    return response.data;
  },

  inviteToGroup: async (groupId, email) => {
    const response = await api.post(`/groups/${groupId}/invite`, { email });
    return response.data;
  },

  getMyInvitations: async () => {
    const response = await api.get('/groups/invitations');
    return response.data;
  },

  acceptInvitation: async (invitationId) => {
    const response = await api.post(`/groups/invitations/${invitationId}/accept`);
    return response.data;
  },

  declineInvitation: async (invitationId) => {
    const response = await api.post(`/groups/invitations/${invitationId}/decline`);
    return response.data;
  },
};

export default groupService;
