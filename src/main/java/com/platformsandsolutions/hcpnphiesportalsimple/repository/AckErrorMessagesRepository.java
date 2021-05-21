package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.AckErrorMessages;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the AckErrorMessages entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AckErrorMessagesRepository extends JpaRepository<AckErrorMessages, Long> {}
