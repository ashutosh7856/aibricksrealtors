import { NextResponse } from 'next/server';
import userModel from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '@/lib/config';
import logger from '@/lib/logger';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/lib/auth/session';

function generateToken(id) {
  return jwt.sign({ id }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validate email and password
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide email and password'
        },
        { status: 400 }
      );
    }

    // Check for user
    const user = await userModel.getByEmail(email);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid credentials'
        },
        { status: 401 }
      );
    }

    // Check if user is active
    if (user.isActive === false) {
      return NextResponse.json(
        {
          success: false,
          error: 'Account is deactivated'
        },
        { status: 401 }
      );
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid credentials'
        },
        { status: 401 }
      );
    }

    // Remove password from response
    delete user.password;

    // Generate token
    const token = generateToken(user.id);
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    logger.error('Error logging in user:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Server error'
      },
      { status: 500 }
    );
  }
}

