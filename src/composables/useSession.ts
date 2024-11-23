export default function useSession() {
    let session: string | null = null;

    const createNewSession = () => {
        // const session = uuid.v4(); if random session
        const session = process.env.REACT_APP_SESSION_KEY ?? 'token';
        localStorage.setItem('session', session);
        return session;
    }

    const getSession = () => {
        const session = localStorage.getItem('session');
        return session;
    }

    const getOrCreateSession = () => {
        const session = getSession();
        if (!session) return createNewSession();
        return session;
    }

    session = getOrCreateSession();

    return { session, createNewSession, getSession, getOrCreateSession }
}