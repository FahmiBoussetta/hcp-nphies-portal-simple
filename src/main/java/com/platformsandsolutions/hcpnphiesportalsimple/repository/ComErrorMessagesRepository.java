package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.ComErrorMessages;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ComErrorMessages entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComErrorMessagesRepository extends JpaRepository<ComErrorMessages, Long> {}
