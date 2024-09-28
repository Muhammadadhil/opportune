// src/controllers/authController.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    
  }

  public refreshAccessToken = async (req: Request, res: Response): Promise<Response> => {
        // const refreshTokenName = req.body;
        const refreshToken = req.cookies["jwt-refresh"];
        console.log('refresh token from cookies:',refreshToken);
        
        if (!refreshToken) {
            return res.status(400).json({ message: "No Refresh token found" });
        }

        const newAccessToken = await this.authService.refreshAccessToken(refreshToken);
        if (!newAccessToken) {
            return res.status(400).json({ message: "Invalid refresh token" });
        }

        return res.status(200).json({ accessToken: newAccessToken });
    };
}    