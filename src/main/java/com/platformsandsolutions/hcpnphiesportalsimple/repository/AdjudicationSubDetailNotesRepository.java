package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationSubDetailNotes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the AdjudicationSubDetailNotes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdjudicationSubDetailNotesRepository extends JpaRepository<AdjudicationSubDetailNotes, Long> {}
