import { dev } from '$app/env';

export const config = dev ? {
    serverPort: 3000,
    messagingServer: 'http://localhost:3002',
} : {

}