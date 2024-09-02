import { loginService, logoutService } from "../Services/auth.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginService(email, password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', token:token });
    } catch (error) {
        res.status(500).json({ error: 'Email or password incorrect' });
    }
};

export const logout = async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            throw new Error('No authorization header found.');
        }
        logoutService(authorization);
        res.status(200).json({ error: 'User logged out Successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Failed to logout' });
    }
};

