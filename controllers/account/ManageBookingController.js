import asyncHandler from "express-async-handler";
import {
  generateBookingNo,
  getAllBookings,
  getBookingById,
  getBookingByUser,
  getFilteredBookings,
  insertBookingTrans,
} from "../../models/BookingModel.js";
import {
  getTimetableById,
  getTimetableByUserId,
} from "../../models/TimetableModel.js";
import { AppError } from "../../utils/AppError.js";
import { getAllClasses } from "../../models/ClassModel.js";

export const accountBookingsRestrict = asyncHandler(async (req, res, next) => {
  let bookings;
  switch (req.user.userRole) {
    case "admin":
      bookings = await getAllBookings();
      break;
    case "member":
      bookings = await getBookingByUser(req.user.userId);
      break;

    default:
      bookings = await getBookingByUser(req.user.userId);
      break;
  }

  req.bookings = bookings;
  next();
});

export const listAccountbookingsAction = asyncHandler(
  async (req, res, next) => {
    const classes = await getAllClasses();

    const bookings = await req.bookings;

    // const [bookings] = await getBookingByUser(req.user.userId);
    return res.status(200).render("account/manage-bookings", {
      title: "My Bookings",
      bookings,
      classes,
    });
  },
);

export const timetableCheck = asyncHandler(async (req, res, next) => {
  const timetableId = req.params.timetableId ? +req.params.timetableId : null;

  const timetable = await getTimetableById(timetableId);

  if (!timetable || timetable.length === 0) {
    return next(
      new AppError("Sorry, this timetable class doesn't exist.", 400, {
        text: "Back to Timetable",
        link: "/timetable",
      }),
    );
  }

  if (!timetable[0].availability) {
    return next(
      new AppError("Sorry, this timetable class has been fully booked.", 400, {
        text: "Back to Timetable",
        link: "/timetable",
      }),
    );
  }

  req.timetable = timetable.pop();

  next();
});

// USERS WHO NEVER BOOKED A TIMETABLE CLASS ARE ALLOWED TO ACCESS BOOKING FORM
// TODO: POPUP FOR BOOKED USER
export const showBookingFormAction = asyncHandler(async (req, res, next) => {
  const myBookings = await getTimetableByUserId(req.user.userId);
  const myBookingTimetableIds = await myBookings.reduce((acc, cur) => {
    acc.push(cur.timetableId);
    return acc;
  }, []);
  if (
    myBookingTimetableIds &&
    myBookingTimetableIds.includes(+req.params.timetableId)
  ) {
    return next(
      new AppError("It seems you have booked this class", 400, {
        text: "Go To My Bookings",
        link: "/auth/account/manage-bookings",
      }),
    );
  }
  // console.log(timetable);
  res.status(200).render("account/bookingForm", {
    title: "Booking",
    showHeader: false,
    timetable: req.timetable,
    referer: req.get("referer") || "/",
  });
});

export const createBookingAction = asyncHandler(async (req, res, next) => {
  const newBookingData = {
    timetableId: req.timetable.timetableId,
    userId: req.user.userId,
  };

  const newBooking = await insertBookingTrans(newBookingData);

  await generateBookingNo(newBooking.bookingId);

  req.session.successMsg = "Booked successfully!";

  return res.redirect(
    `/auth/account/booking-confirmation/${newBooking.bookingId}`,
  );
});

export const accountBookingConfirmRestrict = asyncHandler(
  async (req, res, next) => {
    let booking;
    if (req.params.bookingId) {
      booking = await getBookingById(+req.params.bookingId);

      if (!booking || booking.length === 0) {
        return next(new AppError("Booking Confirmation Not Found", 404));
      }

      const bookingUserId = await booking[0].userId;

      if (req.user.userId !== bookingUserId) {
        return next(new AppError("You are not authorised to access.", 403));
      }

      req.bookingConfirmation = booking.pop();
    }

    next();
  },
);

export const showBookingConfirmAction = asyncHandler(async (req, res, next) => {
  res.render("account/booking-confirm", {
    title: "Booking Confirmation",
    showHeader: false,
    booking: req.bookingConfirmation,
  });
});

export const myBookingsSearchFilterSortAction = asyncHandler(
  async (req, res, next) => {
    const { filteredBookings, page, totalItems, totalPages, limit } =
      await getFilteredBookings(req.user, req.query);

    res.json({
      bookings: filteredBookings,
      pagination: {
        currentPage: page,
        totalItems,
        totalPages,
        limit,
      },
    });
  },
);
