package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.TaskResponse;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TaskResponse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskResponseRepository extends JpaRepository<TaskResponse, Long> {}
