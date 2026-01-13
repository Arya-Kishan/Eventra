import {AppConstants} from '@constants/AppConstants';
import axios from 'axios';
import {ApiReturnType} from 'types/AppTypes';

const getConversationApi = async ({
  sender,
  receiver,
}: {
  sender: string;
  receiver: string;
}): Promise<ApiReturnType> => {
  try {
    const {data} = await axios.get(
      `${AppConstants.socketBaseUrl}/socket/message/getMessages?sender=${sender}&receiver=${receiver}`,
    );
    console.log('dara :', data);
    return {data: data, message: 'Events Fetched', success: true, error: null}; // Return the response data
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      data: null,
      message: 'Error in events Fetching',
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

const createMessageApi = async ({
  sender,
  receiver,
  message,
}: {
  sender: string;
  receiver: string;
  message: {type: string; value: string};
  conversationId: string;
}): Promise<ApiReturnType> => {
  try {
    const {data} = await axios.post(
      `${AppConstants.socketBaseUrl}/socket/message/send`,
      {sender, receiver, message},
    );
    return {data: data, message: 'Message Created', success: true, error: null}; // Return the response data
  } catch (error) {
    console.error('Error creating message data:', error);
    return {
      data: null,
      message: 'Error in Message creating',
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

const unseenMessageApi = async ({
  body,
  type,
}: {
  body: any;
  type: 'get' | 'delete';
}): Promise<ApiReturnType> => {
  try {
    const {data} = await axios.post(
      `${AppConstants.socketBaseUrl}/socket/message/unseenMessages?type=${type}`,
      body,
    );
    return {data: data, message: 'Events Fetched', success: true, error: null}; // Return the response data
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      data: null,
      message: 'Error in events Fetching',
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

const createConversationApi = async ({
  sender,
  receiver,
}: {
  sender: string;
  receiver: string;
}): Promise<ApiReturnType> => {
  try {
    const {data} = await axios.post(
      `${AppConstants.socketBaseUrl}/socket/conversation/create`,
      {sender, receiver},
    );
    return {
      data: data,
      message: 'Conversation Created',
      success: true,
      error: null,
    }; // Return the response data
  } catch (error) {
    console.error('Error in creating conversation:', error);
    return {
      data: null,
      message: 'Error in conversation creating',
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

const getUserConversationsApi = async ({
  userId,
}: {
  userId: string;
}): Promise<ApiReturnType> => {
  try {
    const {data} = await axios.get(
      `${AppConstants.socketBaseUrl}/socket/conversation/user/${userId}`,
    );
    return {
      data: data,
      message: 'Conversations Fetched',
      success: true,
      error: null,
    }; // Return the response data
  } catch (error) {
    console.error('Error fetching Conversations data:', error);
    return {
      data: null,
      message: 'Error in Conversations Fetching',
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

const getUnseenMessageCountApi = async ({
  userId,
}: {
  userId: string;
}): Promise<ApiReturnType> => {
  try {
    const {data} = await axios.get(
      `${AppConstants.socketBaseUrl}/socket/conversation/user/unseencount/${userId}`,
    );
    return {
      data: data,
      message: 'Conversations Fetched',
      success: true,
      error: null,
    }; // Return the response data
  } catch (error) {
    console.error('Error fetching Conversations count:', error);
    return {
      data: null,
      message: 'Error in Conversations Fetching count',
      success: false,
      error: JSON.stringify(error),
    }; // Rethrow the error to be handled by the calling function
  }
};

export {
  createMessageApi,
  getConversationApi,
  unseenMessageApi,
  createConversationApi,
  getUserConversationsApi,
  getUnseenMessageCountApi,
};
