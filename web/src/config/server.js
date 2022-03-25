import { dev } from '$app/env';

export const config = dev ? {
    serverPort: 3000,
    messagingServer: 'http://18.140.147.176:3002',
} : {
    serverPort: 3000,
    messagingServer: 'http://18.140.147.176:3002',
}