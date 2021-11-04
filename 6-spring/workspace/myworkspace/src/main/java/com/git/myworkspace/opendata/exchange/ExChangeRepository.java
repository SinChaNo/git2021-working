package com.git.myworkspace.opendata.exchange;

//import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExChangeRepository extends JpaRepository<ExChange, String>{
//	List<ExChange> findBycurUnit(Pageable page, String curUnit);
}
