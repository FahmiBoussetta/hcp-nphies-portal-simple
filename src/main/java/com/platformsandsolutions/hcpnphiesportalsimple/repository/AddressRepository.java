package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Address;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Address entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {}
