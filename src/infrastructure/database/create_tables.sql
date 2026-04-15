--Users TABLE
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user'
);

-- SERVICES TABLE
CREATE TABLE Services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    duration INT NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

--BOOKINGS TABLE
CREATE TABLE Bookings (
    id SERIAL PRIMARY KEY,
    userId INT NULL,
    guestName VARCHAR(100) NULL,
    guestEmail VARCHAR(150) NULL,
    serviceId INT NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (serviceId) REFERENCES Services(id)
);


--SSED SPA SERVICES
INSERT INTO Services (name, duration, price) VALUES
    ('Massage', 60, 80.00),
    ('Facial', 45, 65.00),
    ('Hot Stone Therapy', 90, 120.00);
