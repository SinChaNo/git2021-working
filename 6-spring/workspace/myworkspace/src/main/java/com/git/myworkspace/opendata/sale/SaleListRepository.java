package com.git.myworkspace.opendata.sale;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SaleListRepository  extends JpaRepository<SaleList, Long> {
}
