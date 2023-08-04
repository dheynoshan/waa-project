INSERT INTO job_posting (id, title, org_name, details, date_posted, status, city, state, deleted)
VALUES (1, 'Software Engineer', 'ABC Tech', 'We are hiring a software engineer.', '2023-07-31', true, 'New York', 'NY', false),
       (2, 'Marketing Specialist', 'XYZ Corp', 'Join our marketing team!', '2023-07-30', false, 'San Francisco', 'CA', false),
       (3, 'Data Analyst', 'DataCo', 'Looking for a data analyst with SQL skills.', '2023-07-29', true, 'Chicago',
        'IL', false);


INSERT INTO event (id, name, type, location, event_date, deleted)
VALUES (1, 'Conference on Artificial Intelligence', 'Conference', 'San Francisco, CA', '2023-08-15', false),
       (2, 'Music Festival', 'Festival', 'Austin, TX', '2023-09-10', false),
       (3, 'Charity Gala Dinner', 'Charity', 'New York, NY', '2023-07-25', false),
       (4, 'Tech Meetup', 'Meetup', 'Seattle, WA', '2023-08-05', false),
       (5, 'Fashion Show', 'Fashion', 'Paris, France', '2023-10-01', false),
       (6, 'Sports Tournament', 'Sports', 'Los Angeles, CA', '2023-09-20', false),
       (7, 'Art Exhibition', 'Exhibition', 'London, UK', '2023-08-28', false),
       (8, 'Food Festival', 'Festival', 'Chicago, IL', '2023-09-15', false),
       (9, 'Startup Pitch Event', 'Competition', 'Berlin, Germany', '2023-07-30', false),
       (10, 'Educational Workshop', 'Workshop', 'Tokyo, Japan', '2023-09-05', false);


INSERT INTO news (id, posted_date, details, deleted)
VALUES (1, '2023-07-31',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec neque eget purus pharetra bibendum.', false),
       (2, '2023-07-30', 'Nullam ac ex sagittis, iaculis lorem nec, efficitur libero.', false),
       (3, '2023-07-29', 'Aenean vel nunc sit amet ex accumsan tincidunt.', false),
       (4, '2023-07-28',
        'Pellentesque eu nisi eu augue euismod rhoncus. Fusce scelerisque est id libero sodales, vitae sodales justo porttitor.', false),
       (5, '2023-07-27', 'Vivamus at dolor non nisi sollicitudin dictum sit amet et neque.', false),
       (6, '2023-07-26', 'Nam facilisis justo non neque venenatis, eu euismod arcu auctor.', false),
       (7, '2023-07-25', 'Quisque bibendum erat vel elit laoreet ultricies.', false),
       (8, '2023-07-24', 'Sed gravida velit nec odio suscipit facilisis.', false),
       (9, '2023-07-23', 'Duis pharetra ipsum vel mauris facilisis, eget vestibulum orci suscipit.', false),
       (10, '2023-07-22', 'Curabitur euismod nisl id elit cursus aliquet.', false);
