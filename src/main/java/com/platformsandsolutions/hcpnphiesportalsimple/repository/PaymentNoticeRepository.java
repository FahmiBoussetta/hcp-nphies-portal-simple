package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.PaymentNotice;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PaymentNotice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentNoticeRepository extends JpaRepository<PaymentNotice, Long> {}
