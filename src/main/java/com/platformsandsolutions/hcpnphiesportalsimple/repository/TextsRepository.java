package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Texts;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Texts entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TextsRepository extends JpaRepository<Texts, Long> {}
