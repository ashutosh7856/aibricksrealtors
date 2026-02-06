import { NextResponse } from 'next/server';
import scheduleVisitModel from '@/lib/models/ScheduleVisit';
import propertyModel from '@/lib/models/Property';
import { protect } from '@/lib/middleware/auth';
import { authorizeAdmin } from '@/lib/middleware/authorize';
import logger from '@/lib/logger';
import { convertTimestamps } from '@/lib/utils/timestampConverter';

export async function GET(req, { params }) {
  try {
    const authResult = await protect(req);
    if (authResult.error) {
      return NextResponse.json(
        authResult.error,
        { status: authResult.error.statusCode }
      );
    }

    const adminCheck = authorizeAdmin(authResult.user);
    if (adminCheck.error) {
      return NextResponse.json(
        adminCheck.error,
        { status: adminCheck.error.statusCode }
      );
    }

    const { id } = await params;
    const visit = await scheduleVisitModel.getById(id);

    if (!visit) {
      return NextResponse.json(
        {
          success: false,
          error: 'Visit schedule not found'
        },
        { status: 404 }
      );
    }

    // Convert Firestore timestamps to ISO strings
    const visitWithConvertedDates = convertTimestamps(visit);

    // Fetch property name if propertyId exists
    if (visitWithConvertedDates.propertyId) {
      try {
        const property = await propertyModel.getById(visitWithConvertedDates.propertyId);
        if (property) {
          visitWithConvertedDates.propertyTitle = property.propertyTitle || property.title || null;
        }
      } catch (error) {
        logger.error(`Error fetching property ${visitWithConvertedDates.propertyId} for schedule visit:`, error);
        // Continue even if property fetch fails
      }
    }

    return NextResponse.json({
      success: true,
      data: visitWithConvertedDates
    });
  } catch (error) {
    logger.error('Error getting visit by ID:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve visit. Please try again later.'
      },
      { status: 500 }
    );
  }
}

