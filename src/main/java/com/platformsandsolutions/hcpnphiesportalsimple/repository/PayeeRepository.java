package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Payee;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Payee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PayeeRepository extends JpaRepository<Payee, Long> {}
