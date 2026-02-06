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

    const { propertyId } = await params;
    const visits = await scheduleVisitModel.getByPropertyId(propertyId);

    // Convert Firestore timestamps to ISO strings
    const visitsWithConvertedDates = visits.map(visit => convertTimestamps(visit));

    // Fetch property name
    let propertyTitle = null;
    try {
      const property = await propertyModel.getById(propertyId);
      if (property) {
        propertyTitle = property.propertyTitle || property.title || null;
      }
    } catch (error) {
      logger.error(`Error fetching property ${propertyId} for schedule visits:`, error);
      // Continue even if property fetch fails
    }

    // Enrich visits with property name
    const visitsWithPropertyNames = visitsWithConvertedDates.map(visit => ({
      ...visit,
      propertyTitle: visit.propertyTitle || propertyTitle || null
    }));

    return NextResponse.json({
      success: true,
      count: visitsWithPropertyNames.length,
      data: visitsWithPropertyNames
    });
  } catch (error) {
    logger.error('Error getting visits by property:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve visits. Please try again later.'
      },
      { status: 500 }
    );
  }
}

