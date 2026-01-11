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
    console.log({sender, receiver});
    const {data} = await axios.get(
      `${AppConstants.socketBaseUrl}/socket/message/getMessages?sender=${sender}&receiver=${receiver}`,
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

const createMessageApi = async ({
  sender,
  receiver,
  message,
}: {
  sender: string;
  receiver: string;
  message: {type: string; value: string};
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

export {createMessageApi, getConversationApi, unseenMessageApi};
