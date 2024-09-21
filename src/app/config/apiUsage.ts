const apiUsage = {
  user: {
    signup: {
      method: "POST",
      description: "Register a new user.",
      endpoint: "/api/auth/signup",
    },
    signin: {
      method: "POST",
      description: "Log in an existing user.",
      endpoint: "/api/auth/signin",
    },
  },
  cars: {
    getAll: {
      method: "GET",
      description: "Retrieve all cars.",
      endpoint: "/api/cars",
    },
    getById: {
      method: "GET",
      description: "Retrieve a car by ID.",
      endpoint: "/api/cars/:id",
    },
    create: {
      method: "POST",
      description: "Create a new car (admin only).",
      endpoint: "/api/cars",
    },
    update: {
      method: "PUT",
      description: "Update a car (admin only).",
      endpoint: "/api/cars/:id",
    },
    returnCar: {
      method: "PUT",
      description: "Return a car (admin only).",
      endpoint: "/api/cars/return",
    },
    delete: {
      method: "DELETE",
      description: "Delete a car (admin only).",
      endpoint: "/api/cars/:id",
    },
  },
  bookings: {
    create: {
      method: "POST",
      description: "Create a new booking.",
      endpoint: "/api/bookings",
    },
    getAll: {
      method: "GET",
      description: "Retrieve all bookings (admin only).",
      endpoint: "/api/bookings",
    },
    getMyBookings: {
      method: "GET",
      description: "Retrieve bookings for the logged-in user.",
      endpoint: "/api/bookings/my-bookings",
    },
  },
};

export default apiUsage;
