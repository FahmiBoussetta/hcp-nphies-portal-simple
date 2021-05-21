package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.PayNotErrorMessages;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PayNotErrorMessages entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PayNotErrorMessagesRepository extends JpaRepository<PayNotErrorMessages, Long> {}
