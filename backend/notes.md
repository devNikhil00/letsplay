# 🧠 Backend Utility Classes & Functions

> **Quick Reference:** These utilities help make backend code cleaner, more consistent, and easier to maintain by reducing repetitive error handling and providing a uniform structure for responses.

## 📋 At a Glance Summary
- **`asyncHandler`** → Wraps async routes to auto-catch errors
- **`ApiResponse`** → Standardizes successful API responses  
- **`apiError`** → Structured error handling with consistent format
- **Result:** Clean, maintainable code with minimal repetition

---

## 🔹 1. asyncHandler

### **Definition:**
The `asyncHandler` is a higher-order function used to handle **asynchronous errors** in Express routes.  
It automatically catches any errors in async route handlers and forwards them to the **global error-handling middleware**, removing the need for repetitive `try...catch` blocks.

### **Purpose:**
- ✅ Handles errors in async route functions without writing `try...catch` repeatedly  
- ✅ Keeps route code clean and readable  
- ✅ Ensures all async errors are caught and passed to Express's error handler

### **How It Works:**
It wraps an asynchronous route handler and uses `Promise.resolve()` to catch any errors and pass them to `next(err)`.

### **Implementation:**
```js
const asyncHandler = (requestHandler) => (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
};

module.exports = asyncHandler;
```

### **Usage Example:**
```js
// ✅ With asyncHandler (Clean)
router.get("/users", asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
}));

// ❌ Without asyncHandler (Repetitive)
router.get("/users", async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        next(error);
    }
});
```

**✅ Benefit:** Cleaner routes, no repetitive try...catch, and automatic error forwarding.

---

## 🔹 2. ApiResponse

### **Definition:**
The `ApiResponse` class provides a standard structure for successful API responses.  
It ensures consistency across all endpoints by including properties like status code, message, and data.

### **Purpose:**
- ✅ Maintain a uniform format for success responses
- ✅ Make it easier for frontend and backend teams to understand response patterns
- ✅ Reduce repetitive code for sending JSON responses

### **Implementation:**
```js
class ApiResponse {
    constructor(statusCode, message, data = "Success") {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode >= 200 && statusCode < 300;
    }
}

module.exports = ApiResponse;
```

### **Usage Example:**
```js
// ✅ Consistent response format
res.status(200).json(new ApiResponse(200, "User fetched successfully", userData));

// Response structure:
{
    "statusCode": 200,
    "message": "User fetched successfully",
    "data": { /* user data */ },
    "success": true
}
```

**✅ Benefit:** Consistent and easy-to-read success responses across all endpoints.

---

## 🔹 3. apiError

### **Definition:**
The `apiError` class is a custom error handler that extends JavaScript's built-in `Error` class.  
It provides a structured format for error responses, making debugging and client-side error handling simpler.

### **Purpose:**
- ✅ Create consistent and structured error messages
- ✅ Make global error handling easier
- ✅ Include detailed information like message, status code, and stack trace

### **Implementation:**
```js
class apiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.data = null;
        this.message = message;
        this.success = false;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = apiError;
```

### **Usage Example:**
```js
// ✅ Throwing structured errors
throw new apiError(404, "User not found");
throw new apiError(400, "Invalid input", ["Email is required", "Password too short"]);

// Error response structure:
{
    "statusCode": 404,
    "message": "User not found",
    "errors": [],
    "data": null,
    "success": false
}
```

**✅ Benefit:** Makes error handling uniform and simplifies debugging.

---

## 🧩 Summary Table

| **Utility**     | **Purpose**                           | **Key Benefit**                    |
|-----------------|---------------------------------------|------------------------------------|
| `asyncHandler`  | Handles async errors automatically   | No more repetitive try-catch       |
| `ApiResponse`   | Standardizes success responses        | Consistent response format         |
| `apiError`      | Standardizes error responses          | Uniform error handling             |

## 🎯 Final Result
**Cleaner, consistent, and maintainable backend code with minimal repetition and clear structure.**

---

### 💡 Pro Tips:
1. **Always use `asyncHandler`** for async route handlers
2. **Use `ApiResponse`** for all successful API responses
3. **Throw `apiError`** instead of generic errors for better debugging
4. **Combine all three** for a robust, professional backend structure