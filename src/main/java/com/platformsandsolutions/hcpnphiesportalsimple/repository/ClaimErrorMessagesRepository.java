package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.ClaimErrorMessages;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ClaimErrorMessages entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClaimErrorMessagesRepository extends JpaRepository<ClaimErrorMessages, Long> {}
