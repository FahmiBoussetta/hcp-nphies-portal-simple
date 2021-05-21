package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.TaskOutput;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TaskOutput entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskOutputRepository extends JpaRepository<TaskOutput, Long> {}
