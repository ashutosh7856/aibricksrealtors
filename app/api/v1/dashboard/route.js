import { NextResponse } from 'next/server';
import propertyModel from '@/lib/models/Property';
import contactModel from '@/lib/models/Contact';
import scheduleVisitModel from '@/lib/models/ScheduleVisit';
import interestedModel from '@/lib/models/Interested';
import { protect } from '@/lib/middleware/auth';
import { authorizeAdmin } from '@/lib/middleware/authorize';
import logger from '@/lib/logger';
import { convertTimestamps } from '@/lib/utils/timestampConverter';

// GET - Get all dashboard data (admin only)
export async function GET(req) {
  try {
    // Check authentication
    const authResult = await protect(req);
    if (authResult.error) {
      return NextResponse.json(
        authResult.error,
        { status: authResult.error.statusCode }
      );
    }

    // Check admin authorization
    const adminCheck = authorizeAdmin(authResult.user);
    if (adminCheck.error) {
      return NextResponse.json(
        adminCheck.error,
        { status: adminCheck.error.statusCode }
      );
    }

    // Fetch all data in parallel
    const [propertiesCount, contactsCount, visitsCount, interestedCount, propertiesData, contactsData, visitsData, interestedData] =
      await Promise.all([
        propertyModel.getCount(),
        contactModel.getCount(),
        scheduleVisitModel.getCount(),
        interestedModel.getCount(),
        propertyModel.getAll({}), // Get all properties (no limit in Property model)
        contactModel.getAll(1000),
        scheduleVisitModel.getAll(1000),
        interestedModel.getAll(1000),
      ]);

    // Convert timestamps for all data
    const propertiesWithDates = (propertiesData || []).map(property => convertTimestamps(property));
    const contactsWithDates = (contactsData || []).map(contact => convertTimestamps(contact));
    const visitsWithDates = (visitsData || []).map(visit => convertTimestamps(visit));
    const interestedWithDates = (interestedData || []).map(item => convertTimestamps(item));

    // Helper function to group data by date
    const groupByDate = (data, dateField = 'createdAt') => {
      const grouped = {};
      data.forEach((item) => {
        if (item[dateField]) {
          let date;
          // Handle ISO string, Date object, or Firestore timestamp
          if (typeof item[dateField] === 'string') {
            date = new Date(item[dateField]);
          } else if (item[dateField] instanceof Date) {
            date = item[dateField];
          } else if (item[dateField].toDate && typeof item[dateField].toDate === 'function') {
            date = item[dateField].toDate();
          } else if (item[dateField]._seconds !== undefined) {
            date = new Date(item[dateField]._seconds * 1000);
          } else {
            date = new Date(item[dateField]);
          }
          
          // Only process valid dates
          if (!isNaN(date.getTime())) {
            const dateStr = date.toISOString().split('T')[0];
            if (!grouped[dateStr]) {
              grouped[dateStr] = 0;
            }
            grouped[dateStr]++;
          }
        }
      });
      return grouped;
    };

    // Get last 7 days for time series chart
    const getLastNDays = (n) => {
      const days = [];
      for (let i = n - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          fullDate: date.toISOString().split('T')[0],
          properties: 0,
          visits: 0,
          contacts: 0,
        });
      }
      return days;
    };

    const last7Days = getLastNDays(7);
    
    // Group data by date
    const propertiesByDate = groupByDate(propertiesWithDates);
    const visitsByDate = groupByDate(visitsWithDates);
    const contactsByDate = groupByDate(contactsWithDates);

    // Populate time series data
    const timeSeriesData = last7Days.map((day) => ({
      ...day,
      properties: propertiesByDate[day.fullDate] || 0,
      visits: visitsByDate[day.fullDate] || 0,
      contacts: contactsByDate[day.fullDate] || 0,
    }));

    // Calculate traffic sources (pie chart data)
    const totalContacts = contactsWithDates.length;
    const totalVisits = visitsWithDates.length;
    const totalInterested = interestedWithDates.length;
    const total = totalContacts + totalVisits + totalInterested;

    const trafficSources = [
      {
        name: 'Contacts',
        value: totalContacts,
        percentage: total > 0 ? Math.round((totalContacts / total) * 100) : 0,
        color: '#3B82F6', // blue-400
      },
      {
        name: 'Visits',
        value: totalVisits,
        percentage: total > 0 ? Math.round((totalVisits / total) * 100) : 0,
        color: '#EC4899', // pink-500
      },
      {
        name: 'Interested',
        value: totalInterested,
        percentage: total > 0 ? Math.round((totalInterested / total) * 100) : 0,
        color: '#10B981', // teal-400
      },
    ].filter(item => item.value > 0); // Only show non-zero values

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          properties: propertiesCount,
          contacts: contactsCount,
          visits: visitsCount,
          interested: interestedCount,
        },
        charts: {
          timeSeries: timeSeriesData,
          trafficSources,
        },
      },
    });
  } catch (error) {
    logger.error('Error getting dashboard data:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve dashboard data. Please try again later.',
      },
      { status: 500 }
    );
  }
}

