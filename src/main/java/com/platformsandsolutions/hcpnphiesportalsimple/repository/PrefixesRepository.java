package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Prefixes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Prefixes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrefixesRepository extends JpaRepository<Prefixes, Long> {}
