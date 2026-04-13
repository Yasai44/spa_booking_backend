--Users TABLE
CREATE TABLE Users (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user'
);

-- SERVICES TABLE
CREAT TABLE Services (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    duration INT NOT NULL
);

--BOOKINGS TABLE
CREATE TABLE BOOKINGS (
    id UUID PRIMARY KEY,
    userId UUID NULL,
    guestName VARCHAR(100) NULL,
    guestEmail VARCHAR(150) NULL,
    serviceId UUID NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (serviceId) REFERENCES Services(id)
);

--SSED SPA SERVICES
INSERT INTO Services (id, name, duration) VALUES
    (gen_random_uuid(), 'Massage', 60),
    (gen_random_uuid(), 'Facial', 45),
    (gen_random_uuid(), 'Hot Stone Therapy', 90);