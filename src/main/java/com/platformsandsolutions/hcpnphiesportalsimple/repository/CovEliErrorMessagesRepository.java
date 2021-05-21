package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.CovEliErrorMessages;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CovEliErrorMessages entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CovEliErrorMessagesRepository extends JpaRepository<CovEliErrorMessages, Long> {}
