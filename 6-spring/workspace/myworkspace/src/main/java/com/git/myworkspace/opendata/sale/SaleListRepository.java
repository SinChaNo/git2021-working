package com.git.myworkspace.opendata.sale;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleListRepository  extends JpaRepository<SaleList, Long> {

}
