package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Givens;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Givens entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GivensRepository extends JpaRepository<Givens, Long> {}
