package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationDetailNotes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the AdjudicationDetailNotes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdjudicationDetailNotesRepository extends JpaRepository<AdjudicationDetailNotes, Long> {}
