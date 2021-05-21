package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.TaskInput;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TaskInput entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskInputRepository extends JpaRepository<TaskInput, Long> {}
