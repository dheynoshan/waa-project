import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

const CustomPagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleChange = (event, value) => {
        onPageChange(value);
    };

    return (
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
            renderItem={(item) => (
                <PaginationItem
                    component="button"
                    onClick={(e) => onPageChange(item.page)}
                    {...item}
                />
            )}
        />
    );
};

export default CustomPagination;
