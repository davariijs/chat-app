import { useChatStore } from './chat-store';
import { User, Message } from '@/types';


const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const { getState, setState } = useChatStore;

beforeEach(() => {
  setState({
    messages: [],
    selectedUser: null,
  });
  localStorageMock.clear();
});

describe('chat-store', () => {

  it('should add a new message to the messages array', () => {
    expect(getState().messages.length).toBe(0);
    const newMessage: Message = { id: '1', text: 'Hello', sender: 'me', timestamp: '10:00 AM' };
    
    getState().addMessage(newMessage);
    expect(getState().messages.length).toBe(1);
    expect(getState().messages[0].text).toBe('Hello');
  });

  it('should set the selected user and load their initial messages', () => {
    const user: User = { id: 'user-1', name: 'Test User' } as User;
    const userMessages: Message[] = [{ id: 'm1', text: 'Existing message', sender: 'other', timestamp: '9:00 AM' }];
    localStorageMock.setItem(`chat_history_${user.id}`, JSON.stringify(userMessages));

    getState().setSelectedUser(user);

    expect(getState().selectedUser?.id).toBe('user-1');
    expect(getState().messages.length).toBe(1);
    expect(getState().messages[0].text).toBe('Existing message');
  });

  it('should save new messages to localStorage for the selected user', () => {
    const user: User = { id: 'user-2', name: 'Another User' } as User;
    getState().setSelectedUser(user);
    
    const newMessage: Message = { id: '2', text: 'A new message', sender: 'me', timestamp: '11:00 AM' };
    
    getState().addMessage(newMessage);
    
    const stored = localStorageMock.getItem(`chat_history_${user.id}`);
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed.length).toBe(1);
    expect(parsed[0].text).toBe('A new message');
  });

  it('should not save to localStorage if no user is selected', () => {
    expect(getState().selectedUser).toBeNull();
    const newMessage: Message = { id: '3', text: 'Orphan message', sender: 'me', timestamp: '12:00 PM' };

    getState().addMessage(newMessage);

    expect(localStorageMock.getItem('chat_history_undefined')).toBeNull();
  });

});