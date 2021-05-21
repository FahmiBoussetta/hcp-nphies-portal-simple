package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Suffixes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Suffixes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SuffixesRepository extends JpaRepository<Suffixes, Long> {}
